<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patients extends Model
{
    use HasFactory;
    protected $table = 'patients';

    protected $fillable = [
        'name',
        'surname',
        'phone',
        'email',
        'nickname',
        'role',
        'avatar',
        'client_id',
        'expert_id',
        'diagnosis',
        'note',
        'video_path',
        'video_note',
        'theme',
    ];
}
