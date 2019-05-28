<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO -->
    <meta name="author" content="Maurits Robbe">
    <meta name="description" content="">
    <meta name="keywords" content="cars, porsche">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="http://cdnjs.cloudflare.com">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600|Source+Sans+Pro:400" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Favicons -->

    <style type="text/css">



    </style>
</head>
<body class="no-scroll {{ (Request::segment(1) !== NULL ) ? Request::segment(1) : 'home' }}" data-spy="scroll" data-target="#sideNav" data-offset="200">
    <header>
        <div class="container">
            <div class="row">
                <div class="col">
                    <a href="#intro" class="logo"><span>Porsche</span>xperience</a>
                </div>
            </div>
        </div>
    </header>
    <main class="">
        @yield('content')
    </main>
    
    <!-- Scripts -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/ScrollMagic.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/animation.gsap.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/debug.addIndicators.js"></script>

    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>