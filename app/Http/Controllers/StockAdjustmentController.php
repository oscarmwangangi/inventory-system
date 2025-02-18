<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StockAdjustment;
use App\Models\Product;

class StockAdjustmentController extends Controller
{
    public function index()
    {
        $adjustments = StockAdjustment::with('product')->get();
    \Log::info('Stock Adjustments:', $adjustments->toArray()); // Log the response
    return response()->json($adjustments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'adjustment' => 'required|integer',
            'reason' => 'nullable|string|max:255',
        ]);

        $adjustment = StockAdjustment::create($request->all());

        // Update the product's stock level
        $product = Product::find($request->product_id);
        $product->stock += $request->adjustment;
        $product->save();

        return response()->json($adjustment, 201);
    }
}