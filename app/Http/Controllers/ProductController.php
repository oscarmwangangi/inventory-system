<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:150',
            'category_id'  => 'nullable|exists:categories,id',
            'variation'    => 'nullable|string|max:100',
            'base_price'   => 'nullable|numeric',
            'cost'         => 'nullable|numeric',
            'description'  => 'nullable|string',
            'stock'        => 'nullable|string',
        ]);

        $product = Product::create([
            'name'         => $validated['name'],
            'category_id'  => $validated['category_id'] ?? null,
            'variation'    => $validated['variation'] ?? null,
            'base_price'   => $validated['base_price'] ?? 0,
            'cost'         => $validated['cost'] ?? 0,
            'description'  => $validated['description'] ?? null,
            'stock'        => $validated['stock']  ?? 0,
        ]);

        return response()->json($product, 201);
    }
}
