<?php

namespace MageWorx\SearchSuiteAutocomplete\Model\Search;

use \MageWorx\SearchSuiteAutocomplete\Helper\Data as HelperData;
use \Magento\Search\Helper\Data as SearchHelper;
use \Magento\Search\Model\AutocompleteInterface;
use \MageWorx\SearchSuiteAutocomplete\Model\Source\AutocompleteFields;

/**
 * Suggested model. Return suggested data used in search autocomplete
 */
class Suggested implements \MageWorx\SearchSuiteAutocomplete\Model\SearchInterface
{
    /**
     * @var \MageWorx\SearchSuiteAutocomplete\Helper\Data
     */
    protected $helperData;

    /**
     * @var \Magento\Search\Helper\Data
     */
    protected $searchHelper;

    /**
     * @var \Magento\Search\Model\AutocompleteInterface;
     */
    protected $autocomplete;

    /**
     * Suggested constructor.
     *
     * @param HelperData $helperData
     * @param SearchHelper $searchHelper
     * @param AutocompleteInterface $autocomplete
     */
    public function __construct(
        HelperData $helperData,
        SearchHelper $searchHelper,
        AutocompleteInterface $autocomplete
    ) {
        $this->helperData   = $helperData;
        $this->searchHelper = $searchHelper;
        $this->autocomplete = $autocomplete;
    }

    /**
     * {@inheritdoc}
     */
    public function getResponseData()
    {
        $responseData['code'] = AutocompleteFields::SUGGEST;
        $responseData['data'] = [];

        if (!$this->canAddToResult()) {
            return $responseData;
        }

        $suggestResultNumber = $this->helperData->getSuggestedResultNumber();

        $autocompleteData = $this->autocomplete->getItems();
        $autocompleteData = array_slice($autocompleteData, 0, $suggestResultNumber);
        foreach ($autocompleteData as $item) {
            $item                   = $item->toArray();
            // Don 25/05

            $getResultUrlChang      = $this->searchHelper->getResultUrl($item['title']);
            $pattern5 = '/^[a-zA-Z0-9\.\-\(\)\s\γ\Γ\θ\Θ\/]*$/';
            $pattern6 = '/\(/';
            $pattern7 = '/\)/';
            $pattern8 = '/\)|\(/';

            //full option
            if (preg_match($pattern8, $item['title'])) {
                if(preg_match($pattern5, $item['title']) && preg_match($pattern6, $item['title']) && preg_match($pattern7, $item['title'])){
                    $getResultUrlChang = str_replace( 'catalogsearch/result/?q=', 'catalogsearch/advanced/result/?sku=', $getResultUrlChang );
                }
            } else {
                if(preg_match($pattern5, $item['title'])){
                    $getResultUrlChang = str_replace( 'catalogsearch/result/?q=', 'catalogsearch/advanced/result/?sku=', $getResultUrlChang );
                }
            }

            // if(strpos($item['title'], '-')){
            //     $getResultUrlChang = str_replace( 'catalogsearch/result/?q=', 'catalogsearch/advanced/result/?sku=', $getResultUrlChang );
            // }

            // End Don 25/05

            $item['url']            = $getResultUrlChang;
            $responseData['data'][] = $item;
        }
        return $responseData;
    }

    /**
     * {@inheritdoc}
     */
    public function canAddToResult()
    {
        return in_array(AutocompleteFields::SUGGEST, $this->helperData->getAutocompleteFieldsAsArray());
    }
}
