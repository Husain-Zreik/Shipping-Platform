<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShipmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'guest'], function () {

    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::get("/shipments", [ShipmentController::class, "getAllShipments"]);
    Route::post("/shipments/create", [ShipmentController::class, "createShipment"]);
    Route::delete("/shipments/{id}", [ShipmentController::class, "deleteShipment"]);
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});
