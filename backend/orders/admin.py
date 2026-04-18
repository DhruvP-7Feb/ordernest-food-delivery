from django.contrib import admin
from .models import Order, OrderItem, Cart, CartItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'restaurant', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'restaurant')
    inlines = [OrderItemInline]

admin.site.register(Cart)
admin.site.register(CartItem)
