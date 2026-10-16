
'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/axios'
import { useRouter } from 'next/navigation'

const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
}

const formatDate = (value) => {
    if (!value) return 'Not available'
    const date = new Date(value)
    return Number.isNaN(date.getTime())
        ? 'Not available'
        : date.toLocaleString('en-IN')
}

const formatPrice = (value) =>
    `₹${Number(value || 0).toLocaleString('en-IN')}`

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cancellingId, setCancellingId] = useState(null)

    const router = useRouter()

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError('')

            const res = await api.get('/api/orders')

            const data = res.data

            // Supports array or paginated API responses
            const orderList = Array.isArray(data)
                ? data
                : Array.isArray(data?.orders)
                    ? data.orders
                    : Array.isArray(data?.items)
                        ? data.items
                        : null

            if (!orderList) {
                throw new Error('Unexpected orders API response')
            }

            setOrders(orderList.filter(
                (order) => order && typeof order === 'object'
            ))
        } catch (err) {
            console.error('Failed to fetch orders:', err)
            setError('Failed to load orders. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const cancelOrder = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return
        }

        try {
            setCancellingId(id)

            await api.patch(`/api/orders/cancel/${id}`)

            await fetchOrders()
        } catch (err) {
            console.error('Cancel order failed:', err)

            alert(
                err?.response?.data?.detail ||
                'Unable to cancel this order.'
            )
        } finally {
            setCancellingId(null)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading your orders...
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={fetchOrders}
                    className="bg-indigo-600 text-white px-6 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (!orders.length) {
        return (
            <div className="p-6 text-center text-gray-600">
                <p className="text-lg">
                    🛒 You haven’t placed any orders yet.
                </p>

                <button
                    onClick={() => router.push('/')}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
                >
                    Start Shopping
                </button>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Your Orders
            </h1>

            {orders.map((order, index) => {
                const address = order.shipping_address || {}
                const shipping = order.shipping_status || {}

                const items = Array.isArray(order.orderitems)
                    ? order.orderitems
                    : []

                const shippingStatus = shipping.status || 'pending'

                return (
                    <div
                        key={order.id ?? index}
                        className="border rounded-lg shadow-sm p-5 mb-6 bg-white"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-center mb-2 gap-3">
                            <h2 className="text-lg font-semibold">
                                Order #{order.id}
                            </h2>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[order.status] ||
                                    'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {order.status || 'Unknown'}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                            Placed on: {formatDate(order.created_at)}
                        </p>

                        {/* Shipping Address */}
                        <div className="mt-3 mb-3">
                            <h3 className="font-medium">
                                📍 Shipping Address
                            </h3>

                            {order.shipping_address ? (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {address.name || 'Customer'}
                                    <br />
                                    {address.address_line1 || ''}
                                    {address.address_line2
                                        ? `, ${address.address_line2}`
                                        : ''}
                                    <br />
                                    {address.city || ''}
                                    {address.state ? `, ${address.state}` : ''}
                                    {address.pin_code
                                        ? ` - ${address.pin_code}`
                                        : ''}
                                    <br />
                                    {address.country || ''}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Shipping address not available.
                                </p>
                            )}
                        </div>

                        {/* Shipping Status */}
                        <div className="mb-3">
                            <h3 className="font-medium">
                                🚚 Shipping Status
                            </h3>

                            <p className="text-sm text-blue-700 capitalize">
                                {shipping.status || 'Not available'}
                                {shipping.updated_at && (
                                    <span>
                                        {' '}(Updated: {formatDate(shipping.updated_at)})
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Order Items */}
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">
                                🛍️ Items
                            </h3>

                            {items.length > 0 ? (
                                items.map((item, itemIndex) => {
                                    const product = item?.product || {}

                                    return (
                                        <div
                                            key={item?.id ?? itemIndex}
                                            className="border p-3 rounded-md mb-2 bg-gray-50"
                                        >
                                            <p className="text-base font-semibold">
                                                {product.title || 'Product unavailable'}
                                                {' '}
                                                ({item?.quantity ?? 0} ×{' '}
                                                {formatPrice(item?.price)})
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                {product.description ||
                                                    'No description available'}
                                            </p>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No order items available.
                                </p>
                            )}
                        </div>

                        {/* Order Footer */}
                        <div className="flex justify-between items-center gap-3 flex-wrap border-t pt-4">
                            <p className="font-semibold text-lg">
                                Total: {formatPrice(order.total_price)}
                            </p>

                            {shippingStatus === 'pending' &&
                                order.status !== 'cancelled' && (
                                    <button
                                        onClick={() => cancelOrder(order.id)}
                                        disabled={cancellingId === order.id}
                                        className={`px-4 py-2 rounded text-white transition ${cancellingId === order.id
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                    >
                                        {cancellingId === order.id
                                            ? 'Cancelling...'
                                            : 'Cancel Order'}
                                    </button>
                                )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
