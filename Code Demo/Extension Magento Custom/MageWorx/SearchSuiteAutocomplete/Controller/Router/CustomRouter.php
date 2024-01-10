<?php
namespace MageWorx\SearchSuiteAutocomplete\Controller\Router;

use Magento\Framework\App\ActionFactory;
use Magento\Framework\App\ResponseInterface;

class CustomRouter implements \Magento\Framework\App\RouterInterface
{

    private $actionFactory;
    private $response;

    public function __construct(
        ActionFactory $actionFactory,
        ResponseInterface $response

    ) {
        $this->actionFactory = $actionFactory;
        $this->_response = $response;
    }

    public function match(\Magento\Framework\App\RequestInterface $request)
    {
        $identifier = $request->getPathInfo();

        if(strpos($identifier, 'catalogsearch/advanced/result')){

            $request->setModuleName('mageworx_searchsuiteautocomplete')->setControllerName('advanced')->setActionName('results');

            $request->setAlias(\Magento\Framework\Url::REWRITE_REQUEST_PATH_ALIAS, $identifier);

            return $this->actionFactory->create(
                'Magento\Framework\App\Action\Forward',
                ['request' => $request]
            );
        }
    }

}
