<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json([
    'name' => 'RescueBite API',
    'checkpoint' => 2,
    'status' => 'ok',
]));
