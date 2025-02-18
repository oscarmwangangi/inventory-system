<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryTable extends Migration
{
    public function up()
    {
        Schema::create('inventory', function (Blueprint $table) {
            // Use product_id as primary key
            $table->unsignedBigInteger('product_id')->primary();
            $table->integer('quantity')->default(0);
            $table->timestamp('last_updated')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventory');
    }
}
