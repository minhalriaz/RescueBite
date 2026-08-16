<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('food', 190);
            $table->string('quantity', 120);
            $table->enum('beneficiary_type', ['human', 'animal']);
            $table->timestamp('pickup_deadline');
            $table->string('address');
            $table->text('description')->nullable();
            $table->enum('status', ['available', 'requested', 'collected', 'expired'])->default('available');
            $table->boolean('is_demo')->default(false);
            $table->timestamps();

            $table->index(['beneficiary_type', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
