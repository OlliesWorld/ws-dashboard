// @ts-nocheck
// src/lib/utils/pageUtils.js

import { onMount } from "svelte";
import { writable } from "svelte/store";
import { fetchMultipleData } from "$lib/utils/fetchUtils";

export function usePageData(fetchUrls) {
  const news = writable(null);
  const articles = writable([]);
  const scores = writable(null);
  const events = writable([]);
  const isLoading = writable(true);

  onMount(async () => {
    try {
      let data;
      if (Array.isArray(fetchUrls)) {
        data = await fetchMultipleData(fetchUrls);
      } else {
        data = await fetchMultipleData([fetchUrls]);
      }

      console.log("Fetched data:", data);

      const [newsData, scoresData] = data;

      console.log("News data:", newsData);
      console.log("Scores data:", scoresData);

      news.set(newsData);
      articles.set(newsData.articles || []);
      scores.set(scoresData);
      events.set(scoresData?.events || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading.set(false);
    }
  });

  return { news, articles, scores, events, isLoading };
}