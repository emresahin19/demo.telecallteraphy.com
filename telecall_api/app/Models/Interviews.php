<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interviews extends Model
{
    use HasFactory;
    protected $table = 'interviews';

    protected $fillable = [
        'patient_id',
        'expert_id',
        'note',
        'general_note',
        'video',
        'video_path',
        'video_time',
        'video_note',
        'session_time',
    ];
}
