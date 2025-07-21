<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #ff7b25, #ff5e00);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        
        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .order-details {
            background-color: #fff8f2;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 25px;
            border-left: 4px solid #ff5e00;
        }
        
        .order-number {
            font-size: 20px;
            font-weight: 600;
            color: #ff5e00;
            margin-bottom: 15px;
        }
        
        .info-box {
            display: flex;
            margin-bottom: 15px;
        }
        
        .info-label {
            font-weight: 600;
            width: 120px;
            color: #666;
        }
        
        .info-value {
            flex: 1;
        }
        
        .product-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .product-table th {
            background-color: #ffefe5;
            padding: 12px;
            text-align: left;
            color: #ff5e00;
        }
        
        .product-table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        
        .total-row {
            font-weight: 600;
            background-color: #fff3eb;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            color: #666;
            font-size: 14px;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #ff5e00;
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        
        .divider {
            height: 1px;
            background-color: #eee;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You For Your Order!</h1>
            <p>Your order #ORD-2023-8765 has been confirmed</p>
        </div>
        
        <div class="content">
            <div class="order-details">
                <div class="order-number">Order #ORD-2023-8765</div>
                
                <div class="info-box">
                    <div class="info-label">Order Date:</div>
                    <div class="info-value">July 20, 2023</div>
                </div>
                
                <div class="info-box">
                    <div class="info-label">Payment Method:</div>
                    <div class="info-value">Credit Card (VISA •••• 4242)</div>
                </div>
                
                <div class="info-box">
                    <div class="info-label">Status:</div>
                    <div class="info-value">
                        <strong style="color: #ff5e00;">Processing</strong>
                    </div>
                </div>
            </div>
            
            <h2 style="color: #ff5e00; margin-top: 0;">Order Summary</h2>
            
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Premium Wireless Headphones</td>
                        <td>1</td>
                        <td>$129.99</td>
                    </tr>
                    <tr>
                        <td>Phone Charging Dock</td>
                        <td>2</td>
                        <td>$24.99</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="2">Subtotal</td>
                        <td>$179.97</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">Shipping</td>
                        <td>$5.99</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">Total</td>
                        <td>$185.96</td>
                    </tr>
                </tfoot>
            </table>
            
            <div style="text-align: center;">
                <a href="#" class="cta-button">Track Your Order</a>
            </div>
            
            <div class="divider"></div>
            
            <h3 style="color: #ff5e00;">Shipping Information</h3>
            <p>
                John Smith<br>
              Mirpur 11<br>
                Apt 4B<br>
             Dhaka<br>
              Bangladesh
            </p>
        </div>
        
        <div class="footer">
            <p>If you have any questions about your order, please contact our support team at support@example.com</p>
            <p>© 2023 YourCompany. All rights reserved.</p>
        </div>
    </div>
</body>
</html>