<?php

namespace App\Providers;

use App\Models\Academic_Year;
use App\Models\SidebarSection;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // academic year
        Vite::prefetch(concurrency: 3);
        Inertia::share(['academic_year'=>Academic_Year::all(),'selected_year' => fn () => Session::get('selected_year')]);
    
         
        Inertia::share('sidebarDisplay', function () {
            $user = auth()->user();

            if (!$user) {
                return [];
            }

            $sections = SidebarSection::with(['subItems' => function ($query) {
                $query->where('is_displayed', true);
            }])
            ->where('user_type', $user->role)
            ->where('is_displayed', true)
            ->get();

            return $sections->map(function ($section) {
                return [
                    'title' => $section->title,
                    'icon' => null, // add icons later if needed
                    'items' => $section->subItems->map(function ($item) {
                        return [
                            'title' => $item->title,
                            'url' => ($item->route && Route::has($item->route)) ? route($item->route) : '#',
                        ];
                    }),
                ];
            });
        });
    }
}
