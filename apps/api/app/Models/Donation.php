<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'food',
        'quantity',
        'beneficiary_type',
        'pickup_deadline',
        'address',
        'description',
        'status',
        'is_demo',
    ];

    protected function casts(): array
    {
        return [
            'pickup_deadline' => 'datetime',
            'is_demo' => 'boolean',
        ];
    }

    public function donor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(RescueNotification::class);
    }
}
