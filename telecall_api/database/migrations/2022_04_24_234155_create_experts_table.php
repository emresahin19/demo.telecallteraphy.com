<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->string('job')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('role')->default(3);
            $table->string('specialist')->nullable();
            $table->string('education')->nullable();
            $table->string('school')->nullable();
            $table->string('graduate')->nullable();
            $table->string('nickname')->unique()->nullable();
            $table->string('avatar')->nullable();
            $table->tinyinteger('theme')->default(0)->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experts');
    }
}
