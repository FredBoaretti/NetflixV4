const url = "db492de8196495daa628bac9c4b5a8ba";

const Movies = {
  originals: `/discover/tv?api_key=${url}&with_networks=213&language=pt-BR`,
  trending: `/trending/all/week?api_key=${url}&language=pt-BR`,
  toprated: `/movie/top_rated?api_key=${url}&language=pt-BR`,
  action: `/discover/movie?api_key=${url}&with_genres=28&language=pt-BR`,
  comedy: `/discover/movie?api_key=${url}&with_genres=35&language=pt-BR`,
  horror: `/discover/movie?api_key=${url}&with_genres=27&language=pt-BR`,
  romance: `/discover/movie?api_key=${url}&with_genres=10749&language=pt-BR`,
  documentary: `/discover/movie?api_key=${url}&with_genres=99&language=pt-BR`,
};

export default { Movies };
