<?php

use App\Http\Controllers\ApiProductCategoryController;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProductTypeController;
use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    "clients" => ClientController::class,
    "products" => ApiProductController::class,
    "product-types" => ApiProductTypeController::class,
    "product-categories" => ApiProductCategoryController::class,
]);
