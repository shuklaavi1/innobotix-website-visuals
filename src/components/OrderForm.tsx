
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    address: "",
    kitSelection: "",
    quantity: 1,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic form validation
    if (!formData.fullName || !formData.email || !formData.whatsappNumber || 
        !formData.address || !formData.kitSelection) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xqabrkaq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsappNumber,
          address: formData.address,
          kit: formData.kitSelection,
          quantity: formData.quantity,
        }),
      });

      if (response.ok) {
        toast({
          title: "Pre-booking Confirmed! 🎉",
          description: "Thanks for reaching out! We'll get back to you soon with payment details.",
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          whatsappNumber: "",
          address: "",
          kitSelection: "",
          quantity: 1,
        });
        
        onClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = formData.quantity * 900;
  const originalPrice = formData.quantity * 1299;
  const savings = originalPrice - totalPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        {/* Header with single close button */}
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 relative">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Pre-Book Your Kit
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Pre-booking Notice */}
        <div className="px-6 pt-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <p className="text-orange-700 font-bold text-sm">
              📦 This is a pre-booking. Orders will be delivered within 7–10 days after successful payment.
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6 space-y-4 max-h-96 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                WhatsApp Number *
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="+91 9876543210"
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Full Address *
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address for delivery"
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 min-h-[80px]"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Kit Selection */}
            <div>
              <Label htmlFor="kit" className="text-sm font-medium text-gray-700">
                Select Kit *
              </Label>
              <Select 
                value={formData.kitSelection} 
                onValueChange={(value) => handleInputChange('kitSelection', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="mt-1 rounded-lg border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Choose your kit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Innobotix Starter Kit">Innobotix Starter Kit</SelectItem>
                  <SelectItem value="Gesture Robot">Gesture Robot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="10"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            {/* Pricing Display */}
            {formData.kitSelection && (
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{formData.kitSelection} × {formData.quantity}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">₹{totalPrice}</span>
                    <span className="text-lg text-red-500 line-through">₹{originalPrice}</span>
                    <span className="text-sm text-red-500 font-medium">(30% Off)</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">You save ₹{savings}!</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg text-lg transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Pre-Book Now'
              )}
            </Button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 px-6 py-3 border-t">
          <p className="text-xs text-gray-500 text-center">
            Secure pre-booking • Delivery within 7-10 days • 24/7 support
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
