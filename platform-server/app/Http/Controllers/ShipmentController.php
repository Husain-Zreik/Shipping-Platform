<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ShipmentController extends Controller
{
    public function createShipment(Request $request)
    {
        try {
            $request->validate([
                'waybill' => 'required|string',
                'name' => 'required|string',
                'address' => 'required|string',
                'number' => 'required|string',
            ]);

            $base64Image = $request->input('image');
            $decodedImage = base64_decode($base64Image);

            $filename = 'shipment_' . time() . '.jpg';
            Storage::disk('public')->put('shipment_images/' . $filename, $decodedImage);
            $imagePath = 'shipment_images/' . $filename;

            $user = Auth::user();

            $shipment = new Shipment([
                'name' => $request->name,
                'address' => $request->address,
                'phone' => $request->number,
                'waybill' => $request->waybill,
                'user_id' => $user->id,
                'image_path' => $imagePath,
            ]);
            $shipment->save();

            $imageUrl = Storage::url('shipment_images/' . $filename);

            return response()->json([
                'status' => 'success',
                'message' => 'shipment created successfully',
                'shipment' => $shipment,
                'image_url' => $imageUrl,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
