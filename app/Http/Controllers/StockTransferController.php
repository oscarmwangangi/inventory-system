<?php

namespace App\Http\Controllers;

use App\Models\StockTransfer;
use Illuminate\Http\Request;

class StockTransferController extends Controller
{
    // Retrieve all stock transfers with their associated product details
    public function index()
    {
        $stockTransfers = StockTransfer::with('product')->get();
        return response()->json($stockTransfers);
    }

    // Store a new stock transfer record
    public function store(Request $request)
    {
        // Validate the incoming data
        $data = $request->validate([
            'product_id'    => 'required|exists:products,id',
            'from_location' => 'nullable|string|max:100',
            'to_location'   => 'nullable|string|max:100',
            'quantity'      => 'required|integer',
            'transfer_date' => 'required|date',
        ]);

        // Create the stock transfer record
        $stockTransfer = StockTransfer::create($data);

        // Load the product relationship so the response includes product details
        $stockTransfer->load('product');

        // Return the newly created record with a 201 Created status
        return response()->json($stockTransfer, 201);
    }
}
