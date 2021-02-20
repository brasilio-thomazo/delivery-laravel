<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableProdutos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_produtos', function (Blueprint $table) {
            $table->id();
            $table->string("name", 50);
            $table->foreign("id_type")->references("id")->on("tipos_produto")->cascadeOnDelete();
            $table->foreign("id_category")->references("id")->on("categorias_produto")->cascadeOnDelete();
            $table->string("description")->nullable();
            $table->float("cost");
            $table->float("price");
            $table->timestamps();
            $table->unique(["name", "id_type", "id_category"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_produtos');
    }
}
