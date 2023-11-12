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


    public function deleteShipment($id)
    {
        try {
            $shipment = Shipment::findOrFail($id);

            Storage::disk('public')->delete($shipment->image_path);

            $shipment->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Shipment deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getAllShipments()
    {
        try {
            $userShipments = Auth::user()->shipments;

            $responseData = $userShipments->map(function ($shipment) {
                return [
                    'id' => $shipment->id,
                    'waybill' => $shipment->waybill,
                    'name' => $shipment->name,
                    'address' => $shipment->address,
                    'number' => $shipment->phone,
                    'image_url' => Storage::url($shipment->image_path),
                ];
            });

            return response()->json([
                'status' => 'success',
                'shipments' => $responseData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateShipment(Request $request, $id)
    {
        try {
            $shipment = Shipment::findOrFail($id);

            if (Auth::user()->id !== $shipment->user_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to update this shipment.',
                ], 403);
            }

            $request->validate([
                'waybill' => 'required|string',
                'name' => 'required|string',
                'address' => 'required|string',
                'number' => 'required|string',
            ]);

            $shipment->update([
                'waybill' => $request->waybill,
                'name' => $request->name,
                'address' => $request->address,
                'phone' => $request->number,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Shipment updated successfully',
                'shipment' => $shipment,
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
