import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import Page from '@/components/sb/Page';
import Teaser from '@/components/sb/Teaser';
import Feature from '@/components/sb/Feature';
import Grid from '@/components/sb/Grid';
import DoesNotExist from '@/components/sb/DoesNotExist';
import Hero from '@/components/sb/Hero';
import Header from "@/components/sb/Header";
import Footer from "@/components/sb/Footer";
import Config from '@/components/sb/config';
import SbLink from "@/components/sb/Link";

export const components = {
    header: Header,
    footer: Footer,
    Link: SbLink,
    Config: Config,
    page: Page,
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    hero: Hero,
    doesNotExist: DoesNotExist
  };

  /**
   * Get the Storyblok API exports a StoryblokApi object to be used in the application
   * @returns {StoryblokApi}
   */
  export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN || 
  process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
	use: [apiPlugin],
	apiOptions: {
		region: 'eu',
	},
    components
});