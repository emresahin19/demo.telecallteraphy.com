<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Experts;

class ApiAuthController extends Controller
{
    public function user(Request $request){
        return $request->user();
    } 

    /**
     * @return array
     * Login user.
     */
    public function login()
    {
        $validator = Validator::make(request()->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails())
            return ['status' => false, 'message' => implode(' ', $validator->errors()->all())];

        $user = User::whereEmail(request()->email)->first();

        if ($user) {
            if ($this->validateUser($user))
                return $this->getAccessToken($user);
            else
                return response()->json(['status' => false, 'message' => 'Invalid credentials.'])->setStatusCode(401);
        } else
            return response()->json(['status' => false, 'message' => 'User not found!'])->setStatusCode(404);
    }

    /**
     * @param User $user
     * @return bool
     * Validate User credentials.
     */
    private function validateUser(User $user)
    {
        return Hash::check(request()->password, $user->password);
    }

    /**
     * @return array
     * Get Access token.
     */
    public function getAccessToken(User $user)
    {
        try {
            return array_merge($user->toArray(), [
                    'access_token' => $user->createToken($user->email)->accessToken,
                    'token' => $user->createToken($user->email)->accessToken->token,
                    'status'       => true,
                ]);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Could not get access token, please try later.'
            ])->setStatusCode(500);
        }
    }

    /**
     * @return array
     * Register new user.
     */
    public function register(Request $request)
    {
        $request = $request->all();

        $add = Experts::create($request);
        $add->save();

        $user = User::create([
            'email' => $request['email'],
            'customer_id' => $add->id,
            'password' => Hash::make($request['password']),
        ]);

        return response()->json([
            'status' => true, 
            'user' => $user,
            'data' => $add,
            'message' => 'User registered successfully.'
        ], 200);
    }

    /**
     * @param Request $request
     * @return array
     * Log out user and revoke tokens.
     */
    public function logout(Request $request)
    {

        $user = User::whereEmail(request()->email)->first();
        $user->tokens()->delete();
        return ['status' => true, 'message' => 'Tokens revoked successfully.'];
    }
}
