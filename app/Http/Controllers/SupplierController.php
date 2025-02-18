<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    // Get all suppliers
    public function index()
    {
        $suppliers = Supplier::all();
        return response()->json($suppliers);
    }

    // Create a new supplier
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'contact_email' => 'nullable|string|email|max:100',
            'contact_phone' => 'nullable|string|max:30',
            'address' => 'nullable|string|max:255',
        ]);

        $supplier = Supplier::create($request->all());
        return response()->json($supplier, 201);
    }
}