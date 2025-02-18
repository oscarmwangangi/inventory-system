<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->enum('order_type', ['sales', 'purchase']);
            $table->unsignedBigInteger('user_id')->nullable();      // User who created the order (sales orders)
            $table->unsignedBigInteger('supplier_id')->nullable();  // Supplier for purchase orders
            $table->string('status', 50)->default('pending');       // e.g., pending, fulfilled, cancelled
            $table->date('order_date');
            $table->decimal('total_amount', 10, 2)->default(0.00);
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('set null');
            $table->foreign('supplier_id')
                ->references('id')->on('suppliers')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
