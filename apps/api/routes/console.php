<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('rescuebite:about', function (): void {
    $this->info('RescueBite Checkpoint 2 API');
})->purpose('Display RescueBite API information');
