from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Order, OrderItem, Cart, CartItem
from .serializers import OrderSerializer, CartSerializer, CartItemSerializer
from restaurants.models import MenuItem

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def _get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def list(self, request):
        cart = self._get_cart(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart = self._get_cart(request.user)
        menu_item_id = request.data.get('menu_item_id')
        quantity = int(request.data.get('quantity', 1))
        
        menu_item = get_object_or_404(MenuItem, id=menu_item_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, menu_item=menu_item)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['post'])
    def update_item(self, request):
        cart = self._get_cart(request.user)
        item_id = request.data.get('item_id')
        quantity = int(request.data.get('quantity', 1))

        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()
        return Response(CartSerializer(cart).data)
        
    @action(detail=False, methods=['post'])
    def remove_item(self, request):
        cart = self._get_cart(request.user)
        item_id = request.data.get('item_id')
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()
        return Response(CartSerializer(cart).data)
        
    @action(detail=False, methods=['post'])
    def checkout(self, request):
        cart = self._get_cart(request.user)
        if not cart.items.exists():
            return Response({'detail': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        restaurant = cart.items.first().menu_item.restaurant
        for item in cart.items.all():
            if item.menu_item.restaurant != restaurant:
                return Response({'detail': 'All items must be from the same restaurant'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=request.user, restaurant=restaurant)
        total = 0
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                menu_item=item.menu_item,
                quantity=item.quantity,
                price_at_time=item.menu_item.price
            )
            total += item.quantity * item.menu_item.price
        
        order.total_amount = total
        order.save()
        
        cart.items.all().delete()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=user).order_by('-created_at')

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
