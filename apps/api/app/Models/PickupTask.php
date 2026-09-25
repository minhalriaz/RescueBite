<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PickupTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'rescue_request_id', 'volunteer_id', 'status', 'assigned_at',
        'picked_up_at', 'delivered_at', 'completed_at', 'completion_note',
    ];

    protected function casts(): array
    {
        return [
            'assigned_at' => 'datetime',
            'picked_up_at' => 'datetime',
            'delivered_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function rescueRequest(): BelongsTo { return $this->belongsTo(RescueRequest::class); }
    public function volunteer(): BelongsTo { return $this->belongsTo(User::class, 'volunteer_id'); }
}
