<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'beneficiary_preference',
        'service_area',
        'api_token_hash',
    ];

    protected $hidden = [
        'password',
        'api_token_hash',
    ];

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function rescueNotifications(): HasMany
    {
        return $this->hasMany(RescueNotification::class);
    }
}
