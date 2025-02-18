<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('supplier_id')->nullable();
            $table->decimal('base_price', 10, 2)->default(0.00);
            $table->decimal('cost', 10, 2)->default(0.00);
            $table->string('variation', 100)->nullable(); // e.g., color, size
            $table->text('description')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('category_id')
                ->references('id')->on('categories')
                ->onDelete('set null');
            $table->foreign('supplier_id')
                ->references('id')->on('suppliers')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
