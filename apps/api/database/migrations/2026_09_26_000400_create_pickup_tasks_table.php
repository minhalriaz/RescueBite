<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pickup_tasks', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('rescue_request_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('volunteer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('status', ['available', 'assigned', 'accepted', 'en_route', 'picked_up', 'delivered', 'completed'])->default('available');
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('picked_up_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('completion_note')->nullable();
            $table->timestamps();

            $table->index(['volunteer_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pickup_tasks');
    }
};
