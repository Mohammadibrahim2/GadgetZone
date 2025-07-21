<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProducFilterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'shopProducts'])->name('home');

Route::get('/shops', [ProductController::class, 'shopProducts'])->name('products.shopProducts');
Route::get('/show/{id}', [ProductController::class, 'show'])->name('products.show');

Route::post('/store', [OrderController::class, 'store'])->name('orders.store');
Route::get('/viewOrder/{orderId}', [OrderController::class, 'viewOrder'])->name('orders.viewOrder');
Route::get('/myOrder/{orderId}', [OrderController::class, 'myOrder'])->name('orders.myOrder');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::get('/create', [CheckoutController::class, 'create'])->name('checkout.create');
Route::get('/filter', [ProducFilterController::class, 'index'])->name('filter.index');
Route::get('/filteredProdcts', [ProducFilterController::class, 'getProducts'])->name('filter.productList');

Route::get('/personal', [ProducFilterController::class, 'pregnancyChecker'])->name('pregnancyChecker');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginView'])->name('login.view');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'store'])->name('register');
    Route::get('/register', [AuthController::class, 'registerView'])->name('register.view');
});


Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'customers', 'as' => 'customers.'], function () {
        Route::get('/customers', [CustomerController::class, 'index'])->name('customers');
    });

    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
    Route::get('/profile/{id}', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function () {
        Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
        Route::get('/create', [CategoryController::class, 'create'])->name('create');
        Route::post('/store', [CategoryController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [CategoryController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [CategoryController::class, 'destroy'])->name('delete');
    });

    Route::group(['prefix' => 'brands', 'as' => 'brands.'], function () {
        Route::get('/brands', [BrandController::class, 'index'])->name('index');
        Route::get('/create', [BrandController::class, 'create'])->name('create');
        Route::post('/store', [BrandController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [BrandController::class, 'edit'])->name('edit');
        Route::post('/update', [BrandController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [BrandController::class, 'destroy'])->name('delete');
    });
    //attribites
    Route::group(['prefix' => 'attributes', 'as' => 'attributes.'], function () {
        Route::get('/attributes', [AttributeController::class, 'index'])->name('index');
        Route::get('/create', [AttributeController::class, 'create'])->name('create');
        Route::post('/store', [AttributeController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [AttributeController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [AttributeController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [AttributeController::class, 'destroy'])->name('delete');
    });
    //product
    Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
        Route::get('/products', [ProductController::class, 'index'])->name('index');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/store', [ProductController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [ProductController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [ProductController::class, 'update'])->name('update');
    });



    Route::group(['prefix' => 'colors', 'as' => 'colors.'], function () {
        Route::get('/colors', [ColorController::class, 'index'])->name('index');
        Route::get('/create', [ColorController::class, 'create'])->name('create');
        Route::post('/store', [ColorController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [ColorController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [ColorController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [ColorController::class, 'destroy'])->name('delete');
    });
    Route::group(['prefix' => 'orders', 'as' => 'orders.'], function () {
        Route::get('/order', [OrderController::class, 'index'])->name('index');
        Route::delete('/destroy/{orderId}', [OrderController::class, 'destroy'])->name('delete');
    });
});

// no need
// require __DIR__ . '/auth.php';
