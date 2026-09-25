<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RescueRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'donation_id', 'ngo_id', 'status', 'reviewed_by', 'requested_at',
        'reviewed_at', 'review_note',
    ];

    protected function casts(): array
    {
        return [
            'requested_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function donation(): BelongsTo { return $this->belongsTo(Donation::class); }
    public function ngo(): BelongsTo { return $this->belongsTo(User::class, 'ngo_id'); }
    public function reviewer(): BelongsTo { return $this->belongsTo(User::class, 'reviewed_by'); }
    public function pickupTask(): HasOne { return $this->hasOne(PickupTask::class); }
}
