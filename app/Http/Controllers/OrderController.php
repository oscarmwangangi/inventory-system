<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Supplier;

class OrderController extends Controller
{
    // Get all orders
    public function index()
    {
        $orders = Order::with(['user', 'supplier'])->get();
        return response()->json($orders);
    }

    // Create a new order
    public function store(Request $request)
    {
        $request->validate([
            'order_type' => 'required|in:sales,purchase',
            'user_id' => 'nullable|exists:users,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'status' => 'nullable|string|max:50',
            'order_date' => 'required|date',
            'total_amount' => 'required|numeric',
        ]);

        $order = Order::create($request->all());
        return response()->json($order, 201);
    }

    // Update an order
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'status' => 'nullable|string|max:50',
            'total_amount' => 'nullable|numeric',
        ]);

        $order->update($request->all());
        return response()->json($order);
    }

    // Delete an order
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}