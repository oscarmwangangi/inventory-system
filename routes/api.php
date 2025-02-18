<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StockTransferController;
use App\Http\Controllers\StockAdjustmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

use App\Http\Controllers\SupplierController;

Route::middleware('api')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);

    Route::post('/categories', [CategoryController::class, 'store']);

    Route::post('/products', [ProductController::class, 'store']);

    Route::get('/products', [ProductController::class, 'index']);

    Route::get('/stock-adjustments', [StockAdjustmentController::class, 'index']);
    
    Route::post('/stock-adjustments', [StockAdjustmentController::class, 'store']);

    Route::get('/stock-transfers', [StockTransferController::class, 'index']);

    Route::post('/stock-transfers', [StockTransferController::class, 'store']);

    Route::get('/suppliers', [SupplierController::class, 'index']);
    Route::post('/suppliers', [SupplierController::class, 'store']);

   
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

   

Route::get('/users', [UserController::class, 'index']);

        // Add more API routes as needed.

});
