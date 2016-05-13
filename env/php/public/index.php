<?

require '../vendor/autoload.php';

$container = new \Slim\Container( [
	'settings' => [
		'outputBuffering'     => false,
		'displayErrorDetails' => true,
	],
] );

$container['view'] = function ( $container ) {
	$view = new \Slim\Views\Twig( __DIR__ . '/../../../src/views', [
		'cache' => false,
	] );
	$view->addExtension( new \Slim\Views\TwigExtension(
		$container['router'],
		$container['request']->getUri()
	) );
	return $view;
};

$app = new \Slim\App( $container );

$routes = json_decode( file_get_contents( __DIR__ . '/../../../src/routes.json' ), true );
$data   = json_decode( file_get_contents( __DIR__ . '/../../../src/data.json'   ), true );

foreach ( $routes as $route => $options ) {
	$app->map( [ 'GET', 'POST' ], $route, function ( $request, $response, $args ) use ( $routes, $data ) {
		$options = array_merge( [
			'data' => [],
		], $routes[ $request->getUri()->getPath() ] );
		$context = array_merge( $data, $options['data'] );
		return $this->view->render(
			$response,
			$options['file'],
			$context
		);
	} );
}

$app->run();

