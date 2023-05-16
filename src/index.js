import articlesTpl from './templates/articles.hbs';
import './sass/index.scss';
import refs from './js/refs';
import NewsApiService from './js/news-service-api';
import LoadMoreBtn from './js/component/load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

const onSearch = e => {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
};

const fetchArticles = () => {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
};

const appendArticlesMarkup = articles => {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
};

const clearArticlesContainer = () => {
  refs.articlesContainer.innerHTML = '';
};

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
