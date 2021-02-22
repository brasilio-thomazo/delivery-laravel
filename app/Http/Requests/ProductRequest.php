<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required',
                Rule::unique("products")
                    ->where('id_type', $this->id_type)
                    ->where('id_category', $this->id_category)
            ],
            'id_type' => ['required', 'numeric'],
            'id_category' => ['required', 'numeric'],
            'cost' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
        ];
    }
}
