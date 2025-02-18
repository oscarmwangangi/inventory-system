<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockTransfer extends Model
{
    // Specify the table name if it's not the plural of the model name
    protected $table = 'stock_transfers';

    // Since your migration only sets a created_at field, disable the default timestamps
    public $timestamps = false;

    // Allow mass assignment for these fields
    protected $fillable = [
        'product_id',
        'from_location',
        'to_location',
        'quantity',
        'transfer_date',
    ];

    // Define the relationship with the Product model
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
