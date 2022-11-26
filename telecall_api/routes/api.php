<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', 'Auth\ApiAuthController@register')->name('register.api');
Route::post('login', 'Auth\ApiAuthController@login');

Route::group(['prefix' => 'auth'], function () {
    Route::get('/user', 'Auth\ApiAuthController@user')->name('api.user');
    Route::post('/logout', 'Auth\ApiAuthController@logout')->name('api.logout');

    //experts
    Route::get('/experts', 'ExpertController@index')->name('experts.index');
    Route::get('/experts/{id}', 'ExpertController@user')->name('experts.user');
    Route::put('/experts/{id}', 'ExpertController@edit')->name('experts.edit');
    Route::post('/experts', 'ExpertController@store')->name('experts.add');

    //patients
    Route::get('/patients', 'PatientController@index')->name('patients.index');
    Route::get('/patients/{id}', 'PatientController@user')->name('patients.user');
    Route::put('/patients/{id}', 'PatientController@edit')->name('patients.edit');
    Route::post('/patients', 'PatientController@store')->name('patients.add');

    //interviews
    Route::get('/interviews', 'InterviewsController@index')->name('interviews.index');
    Route::get('/interviews/{id}', 'InterviewsController@detail')->name('interviews.detail');
    Route::get('/interviews/details/{id}', 'InterviewsController@interview_detail')->name('interviews.interview_detail');
    Route::post('/interviews/edit', 'InterviewsController@edit_note')->name('interviews.edit_note');
});



