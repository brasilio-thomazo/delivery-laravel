<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableClientes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_clientes', function (Blueprint $table) {
            $table->id();
            $table->string("name", 50);
            $table->string("phone", 20);
            $table->string("address");
            $table->integer("addr_number");
            $table->string("addr_complement")->nullable();
            $table->timestamps();
            $table->unique(["name", "phone"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_clientes');
    }
}
