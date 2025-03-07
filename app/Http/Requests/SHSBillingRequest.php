<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SHSBillingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'program_code' => "nullable",
            'year_level' => "nullable",
            'payment_type' => "nullable",
            'cash' => "nullable",
            'installment'=> "nullable",
            'voucher_amount'=> "nullable",
            'onetime_fee'=> "nullable",
            'down_payment_shs'=> "nullable",
        ];
    }
}
