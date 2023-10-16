import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { 
        faFire, 
        faCloudRain, 
        faTree, 
        faCloudBolt, 
        faWater,
        faDove,
        faUmbrella,
        faCloudShowersHeavy,
        faCat,
        faDog,
        faMoon,
        faCity,
        faTreeCity,
        faWind,
        faClock
      } from '@fortawesome/free-solid-svg-icons';

export interface SoundData {
    title: string;
    soundSource: string;
    videoSource: string;
    imageSource:string;
    icon: IconDefinition;
}

const soundsData :  {[key:string]: SoundData} = {
      rain: {
        title: "Rain",
        soundSource: "./public/sounds/rain.wav",
        videoSource: "Video/Raindrops.mp4",
        imageSource: "images/rain.jpg",
        icon: faCloudRain,
      },
      rain3: {
        title: "Rain Heavy",
        soundSource: "./public/sounds/rain3.wav",
        videoSource: "Video/Raindrops.mp4",
        imageSource: "images/rain.jpg",
        icon: faCloudShowersHeavy,
      },
      rain2: {
        title: "Rain Umbrella",
        soundSource: "./public/sounds/rain2.wav",
        videoSource: "Video/Raindrops.mp4",
        imageSource: "images/rain.jpg",
        icon: faUmbrella,
      },
      bonfire: {
        title: "Bonfire",
        soundSource: "./public/sounds/bonfire.wav",
        videoSource: "Video/fire2.mp4",
        imageSource: "./public/Bonfire.jpeg",
        icon: faFire,
      },
      campfire: {
        title: "Campfire",
        soundSource: "./public/sounds/campfire.wav",
        videoSource: "Video/fire2.mp4",
        imageSource: "./public/Bonfire.jpeg",
        icon: faFire,
      },
      forest: {
        title: "Forest",
        soundSource: "./public/sounds/forest.wav",
        videoSource: "Video/forest.mp4",
        imageSource: "images/forest.jpg",
        icon: faTree,
      },
      night: {
        title: "Night",
        soundSource: "./public/sounds/night.wav",
        videoSource: "Video/forest.mp4",
        imageSource: "images/forest.jpg",
        icon: faMoon,
      },
      thunder: {
        title: "Thunder",
        soundSource: "./public/sounds/thunder.wav",
        videoSource: "Video/thunder.mp4",
        imageSource: "images/thunder.jpg",
        icon: faCloudBolt,
      },
      thunder2: {
        title: "Thunder Crack",
        soundSource: "./public/sounds/thunder2.wav",
        videoSource: "Video/thunder.mp4",
        imageSource: "images/thunder.jpg",
        icon: faCloudBolt,
      },
      wind: {
        title: "Wind Storm",
        soundSource: "./public/sounds/windstorm.wav",
        videoSource: "Video/thunder.mp4",
        imageSource: "images/thunder.jpg",
        icon: faWind,
      },
      windcold: {
        title: "Wind Storm Cold",
        soundSource: "./public/sounds/windcold.wav",
        videoSource: "Video/thunder.mp4",
        imageSource: "images/thunder.jpg",
        icon: faWind,
      },
      sea: {
        title: "Sea",
        soundSource: "./public/sounds/sea.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faWater,
      },
      oceanBeach: {
        title: "Ocean Beach",
        soundSource: "./public/sounds/beach.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faWater,
      },
      river: {
        title: "River",
        soundSource: "./public/sounds/river.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faWater,
      },
      birds: {
        title: "Birds",
        soundSource: "./public/sounds/birds.wav",
        videoSource: "",
        imageSource: "",
        icon: faDove,
      },
      cat: {
        title: "Cat Pure",
        soundSource: "./public/sounds/cat.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faCat,
      },
      dog: {
        title: "Dog Bark",
        soundSource: "./public/sounds/dog.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faDog,
      },
      city: {
        title: "City",
        soundSource: "./public/sounds/city.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faCity,
      },
      cityPark: {
        title: "City Park",
        soundSource: "./public/sounds/Citypark.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faTreeCity,
      },
      clock: {
        title: "Clock",
        soundSource: "./public/sounds/clock.wav",
        videoSource: "Video/sea.mov",
        imageSource: "images/sea.jpg",
        icon: faClock,
      },
};

export default soundsData;
    
