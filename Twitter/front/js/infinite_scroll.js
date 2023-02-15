const tweetsContainer = document.getElementById("tweetsContainer"),
    observerRoot = document.getElementById("middleRoot"),
    tweetsContainerBoundaries = tweetsContainer.getBoundingClientRect(),
    loadingSpinner = document.getElementById("loading");
let tweets = document.querySelectorAll(".tweet"),
    lastTweet = tweets[tweets.length - 1];
console.log(tweetsContainerBoundaries);

const tweetsToAdd = `
                        <div class="tweet relative">
                            <div
                                class="absolute justify-center items-center transition-colors right-5 top-3 w-8 h-8 rounded-full hover:bg-main-blue_0 dark:hover:bg-main-blue_100 dark:hover:bg-opacity-20 hidden sm:flex"
                                title="More"
                            >
                                <i class="fa-solid fa-ellipsis text-lg dark:hover:text-main-blue_100 dark:text-white items-center text-gray-500 cursor-pointer"></i>
                            </div>
                            <!-- user image -->
                            <div class="flex rounded-full relative top-4 overflow-hidden twitter-user-img">
                                <img class="w-full h-full object-cover" src="./../images/20180703190744-rollsafe-meme.webp" alt="" />
                            </div>
                            <div class="content ml-3 flex flex-col justify-start w-full gap-1 pt-3 max-w-full overflow-hidden">
                                <!-- flex flex-col sm:flex-row justify-start pb-0 leading-5 sm:items-center -->
                                <div class="flex overflow-hidden mt-1">
                                    <!--  name -->
                                    <div class="title flex items-center font-bold text-gray-800 dark:text-white w-auto max-w-[50%]">
                                        <p class="dotted-text h-6 hover:underline">Mostafa Abdullhuq</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="{1.5}"
                                            stroke="currentColor"
                                            class="w-6 min-w-[25px] text-white fill-main-blue_100"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                            />
                                        </svg>
                                    </div>
                                    <!-- other user and tweet info -->
                                    <div class="flex items-center w-auto max-w-[45%]">
                                        <!-- username -->
                                        <span class="username ml-1 text-md font-normal dark:text-dark-gray_300 dotted-text text-light-gray_100">@mostafaabdullhuq </span>
                                        <!-- publish date -->
                                        <p class="mx-1 flex relative bottom-1 font-bold dark:text-dark-gray_300 text-light-gray_100">.</p>
                                        <p class="publish_date dark:text-dark-gray_300 text-light-gray_100 dotted-text">Just now</p>
                                    </div>
                                </div>
                                <!-- ----paragraph----- -->
                                <div class="sm:pr-4">
                                    <p class="font-normal w-full dark:text-white text-md text-dark-gray_400">
                                        <span class="hashtag">@Zoza_99</span> <span class="hashtag">@Sara_Elbanna</span> <span class="hashtag">@Mohamed_Abdelkarim</span>
                                        <span class="hashtag">@Hager_ahmed</span> <br />
                                        😂😂😂😂
                                    </p>
                                    <div class="w-auto max-h-[500px] flex overflow-hidden dark:border-dark-gray_0 rounded-xl border border-light-gray my-3 mr-2">
                                        <img class="object-cover w-full h-full" src="./../images/meme.jpeg" alt="" />
                                    </div>

                                    <!-- ----controls icons ---- -->
                                    <div class="w-full justify-start grid sm:grid-cols-5 grid-cols-4 gap-1 mt-4">
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="sm:p-2 p-1 rounded-full fa-regular fa-comment hover:bg-main-blue_0"></i>
                                            7,964
                                        </div>
                                        <div class="tweet-control-item hover:text-main-retweet"><i class="fa-solid fa-retweet sm:p-2 p-1 rounded-full hover:bg-green-100"></i>9,247</div>
                                        <div class="tweet-control-item hover:text-main-love"><i class="fa-regular fa-heart sm:p-2 p-1 rounded-full hover:bg-pink-200"></i>90.6K</div>
                                        <div class="tweet-control-item-special hover:text-main-blue_100"><i class="fa-solid fa-chart-simple hover:bg-blue-100 sm:p-2 p-1 rounded-full"></i>30.7M</div>
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="hover:bg-blue-100 sm:p-2 p-1 rounded-full fa-solid fa-arrow-up-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tweet relative">
                            <div
                                class="absolute dark:hover:bg-main-blue_100 dark:hover:bg-opacity-20 justify-center hidden sm:flex items-center transition-colors right-5 top-3 w-8 h-8 rounded-full hover:bg-main-blue_0"
                                title="More"
                            >
                                <i class="fa-solid fa-ellipsis text-lg items-center text-gray-500 dark:hover:text-main-blue_100 dark:text-white cursor-pointer"></i>
                            </div>
                            <!-- user image -->
                            <img class="twitter-user-img relative top-4" src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg" alt="" />
                            <div class="content ml-3 flex flex-col justify-start gap-1 w-full pt-3 max-w-full overflow-hidden">
                                <!-- flex flex-col sm:flex-row justify-start pb-0 leading-5 sm:items-center -->
                                <div class="flex overflow-hidden mt-1">
                                    <!--  name -->
                                    <div class="title flex items-center font-bold text-gray-800 dark:text-white w-auto max-w-[50%]">
                                        <p class="dotted-text h-6 hover:underline">Elon Musk</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="{1.5}"
                                            stroke="currentColor"
                                            class="w-6 min-w-[25px] text-white fill-main-blue_100"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                            />
                                        </svg>
                                    </div>
                                    <!-- other user and tweet info -->
                                    <div class="flex items-center w-auto max-w-[45%]">
                                        <!-- username -->
                                        <span class="username ml-1 text-md font-normal dark:text-dark-gray_300 dotted-text text-light-gray_100">@elonmusk </span>
                                        <!-- publish date -->
                                        <p class="mx-1 flex relative bottom-1 dark:text-dark-gray_300 font-bold text-light-gray_100">.</p>
                                        <p class="publish_date dark:text-dark-gray_300 text-light-gray_100 dotted-text">1h</p>
                                    </div>
                                </div>
                                <!-- ----paragraph----- -->
                                <div class="sm:pr-4">
                                    <p class="font-normal dark:text-white text-md text-dark-gray_400">
                                        More work team completed over night: <br />
                                        - Removed height penalty affecting tweets with pics/video <br />
                                        - increased # of recommended tweets <br />
                                        - Better tracking of dropped tweets <br />
                                        - Removed filter causing false negatives <br />
                                        - Removed penalty if user follows author - Improved reach of retweet
                                    </p>

                                    <!-- ----controls icons ---- -->
                                    <div class="w-full justify-start grid sm:grid-cols-5 grid-cols-4 gap-1 mt-4">
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="sm:p-2 p-1 rounded-full fa-regular fa-comment hover:bg-main-blue_0"></i>
                                            7,964
                                        </div>
                                        <div class="tweet-control-item hover:text-main-retweet"><i class="fa-solid fa-retweet sm:p-2 p-1 rounded-full hover:bg-green-100"></i>9,247</div>
                                        <div class="tweet-control-item hover:text-main-love"><i class="fa-regular fa-heart sm:p-2 p-1 rounded-full hover:bg-pink-200"></i>90.6K</div>
                                        <div class="tweet-control-item-special hover:text-main-blue_100"><i class="fa-solid fa-chart-simple hover:bg-blue-100 sm:p-2 p-1 rounded-full"></i>30.7M</div>
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="hover:bg-blue-100 sm:p-2 p-1 rounded-full fa-solid fa-arrow-up-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tweet relative">
                            <div
                                class="absolute dark:hover:bg-main-blue_100 dark:hover:bg-opacity-20 hidden sm:flex justify-center items-center transition-colors right-5 top-3 w-8 h-8 rounded-full hover:bg-main-blue_0"
                                title="More"
                            >
                                <i class="fa-solid fa-ellipsis text-lg items-center text-gray-500 dark:hover:text-main-blue_100 dark:text-white cursor-pointer"></i>
                            </div>
                            <!-- user image -->
                            <img class="twitter-user-img relative top-4" src="https://pbs.twimg.com/profile_images/1333505995566411782/Qd8AZOnm_400x400.jpg" alt="" />
                            <div class="content ml-3 flex flex-col justify-start w-full gap-1 pt-3 max-w-full overflow-hidden">
                                <!-- flex flex-col sm:flex-row justify-start pb-0 leading-5 sm:items-center -->
                                <div class="flex overflow-hidden mt-1">
                                    <!--  name -->
                                    <div class="title flex items-center font-bold text-gray-800 dark:text-white w-auto max-w-[50%]">
                                        <p class="dotted-text h-6 hover:underline">Amazing Astronomy</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="{1.5}"
                                            stroke="currentColor"
                                            class="w-6 min-w-[25px] text-white fill-main-blue_100"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                            />
                                        </svg>
                                    </div>
                                    <!-- other user and tweet info -->
                                    <div class="flex items-center w-auto max-w-[45%]">
                                        <!-- username -->
                                        <span class="username ml-1 text-md font-normal dark:text-dark-gray_300 dotted-text text-light-gray_100">@MAstronomers </span>
                                        <!-- publish date -->
                                        <p class="mx-1 flex relative bottom-1 font-bold dark:text-dark-gray_300 text-light-gray_100">.</p>
                                        <p class="publish_date text-light-gray_100 dark:text-dark-gray_300 dotted-text">12h</p>
                                    </div>
                                </div>
                                <!-- ----paragraph----- -->
                                <div class="sm:pr-4">
                                    <p class="font-normal dark:text-white text-md text-dark-gray_400">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nisi, porro rem reprehenderit quod omnis minima molestias perspiciatis, facilis suscipit
                                        neque minus cumque nobis ratione veniam alias accusamus amet beatae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi soluta officiis eius,
                                        corporis odit explicabo ab porro provident possimus reprehenderit eveniet quam? Laboriosam corporis cum deleniti debitis quos porro minima.
                                    </p>
                                    <div class="w-auto max-h-[500px] flex dark:border-dark-gray_0 overflow-hidden rounded-xl border border-light-gray my-3 mr-2">
                                        <img class="object-cover w-full h-full" src="https://pbs.twimg.com/media/Foq2t_9XwAAxPaP?format=jpg&name=medium" alt="" />
                                    </div>
                                    <!-- ----controls icons ---- -->
                                    <div class="w-full justify-start grid sm:grid-cols-5 grid-cols-4 gap-1 mt-4">
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="sm:p-2 p-1 rounded-full fa-regular fa-comment hover:bg-main-blue_0"></i>
                                            7,964
                                        </div>
                                        <div class="tweet-control-item hover:text-main-retweet"><i class="fa-solid fa-retweet sm:p-2 p-1 rounded-full hover:bg-green-100"></i>9,247</div>
                                        <div class="tweet-control-item hover:text-main-love"><i class="fa-regular fa-heart sm:p-2 p-1 rounded-full hover:bg-pink-200"></i>90.6K</div>
                                        <div class="tweet-control-item-special hover:text-main-blue_100"><i class="fa-solid fa-chart-simple hover:bg-blue-100 sm:p-2 p-1 rounded-full"></i>30.7M</div>
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="hover:bg-blue-100 sm:p-2 p-1 rounded-full fa-solid fa-arrow-up-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tweet relative">
                            <div
                                class="absolute dark:hover:bg-main-blue_100 dark:hover:bg-opacity-20 hidden sm:flex justify-center items-center transition-colors right-5 top-3 w-8 h-8 rounded-full hover:bg-main-blue_0"
                                title="More"
                            >
                                <i class="fa-solid fa-ellipsis text-lg items-center text-gray-500 dark:hover:text-main-blue_100 dark:text-white cursor-pointer"></i>
                            </div>
                            <!-- user image -->
                            <img class="twitter-user-img relative top-4" src="https://pbs.twimg.com/profile_images/886593368054222849/ZU_32EZB_400x400.jpg" alt="" />
                            <div class="content ml-3 flex flex-col justify-start w-full gap-1 pt-3 max-w-full overflow-hidden">
                                <!-- flex flex-col sm:flex-row justify-start pb-0 leading-5 sm:items-center -->
                                <div class="flex overflow-hidden mt-1">
                                    <!--  name -->
                                    <div class="title flex items-center font-bold text-gray-800 dark:text-white w-auto max-w-[50%]">
                                        <p class="dotted-text h-6 hover:underline">Dr.Sam Youssef Ph.D.,M.Sc.,DPT.</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="{1.5}"
                                            stroke="currentColor"
                                            class="w-6 min-w-[25px] text-white fill-main-blue_100"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                            />
                                        </svg>
                                    </div>
                                    <!-- other user and tweet info -->
                                    <div class="flex items-center w-auto max-w-[45%]">
                                        <!-- username -->
                                        <span class="username ml-1 text-md dark:text-dark-gray_300 font-normal dotted-text text-light-gray_100">@drhossamsamy65</span>
                                        <!-- publish date -->
                                        <p class="mx-1 flex relative dark:text-dark-gray_300 bottom-1 font-bold text-light-gray_100">.</p>
                                        <p class="publish_date dark:text-dark-gray_300 text-light-gray_100 dotted-text">Feb 12</p>
                                    </div>
                                </div>
                                <!-- ----paragraph----- -->
                                <div class="sm:pr-4">
                                    <p class="font-normal dark:text-white text-md text-dark-gray_400">
                                        ملخص لاحداث الايام الاخيرة للتذكرة وربط الأحداث: أحداث غريبة حصلت في الايام القليلة الماضية: 4 فبراير: إسقاط البالون الصيني. ٦ فبراير: الزلزال التركى.. 10
                                        فبراير: إسقاط جسم غامض فوق ألاسكا 11 فبراير: إسقاط جسم غامض فوق كندا 12 فبراير: ظهور جسم غامض فوق الصين 12 فبراير: إسقاط جسم غامض فوق بحيرة هورون هل هذه بداية
                                        لشيء أكبر؟
                                    </p>

                                    <!-- ----controls icons ---- -->
                                    <div class="w-full justify-start grid sm:grid-cols-5 grid-cols-4 gap-1 mt-4">
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="sm:p-2 p-1 rounded-full fa-regular fa-comment hover:bg-main-blue_0"></i>
                                            7,964
                                        </div>
                                        <div class="tweet-control-item hover:text-main-retweet"><i class="fa-solid fa-retweet sm:p-2 p-1 rounded-full hover:bg-green-100"></i>9,247</div>
                                        <div class="tweet-control-item hover:text-main-love"><i class="fa-regular fa-heart sm:p-2 p-1 rounded-full hover:bg-pink-200"></i>90.6K</div>
                                        <div class="tweet-control-item-special hover:text-main-blue_100"><i class="fa-solid fa-chart-simple hover:bg-blue-100 sm:p-2 p-1 rounded-full"></i>30.7M</div>
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="hover:bg-blue-100 sm:p-2 p-1 rounded-full fa-solid fa-arrow-up-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tweet relative">
                            <div
                                class="absolute dark:hover:bg-main-blue_100 dark:hover:bg-opacity-20 hidden sm:flex justify-center items-center transition-colors right-5 top-3 w-8 h-8 rounded-full hover:bg-main-blue_0"
                                title="More"
                            >
                                <i class="fa-solid fa-ellipsis text-lg items-center text-gray-500 dark:hover:text-main-blue_100 dark:text-white cursor-pointer"></i>
                            </div>
                            <!-- user image -->
                            <img class="twitter-user-img relative top-4" src="https://pbs.twimg.com/profile_images/1013797033067581440/lUcwwDZ2_400x400.jpg" alt="" />
                            <div class="content ml-3 flex flex-col justify-start w-full gap-1 pt-3 max-w-full overflow-hidden">
                                <!-- flex flex-col sm:flex-row justify-start pb-0 leading-5 sm:items-center -->
                                <div class="flex overflow-hidden mt-1">
                                    <!--  name -->
                                    <div class="title flex items-center font-bold text-gray-800 dark:text-white w-auto max-w-[50%]">
                                        <p class="dotted-text h-6 hover:underline">World and Science</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="{1.5}"
                                            stroke="currentColor"
                                            class="w-6 min-w-[25px] text-white fill-main-blue_100"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                            />
                                        </svg>
                                    </div>
                                    <!-- other user and tweet info -->
                                    <div class="flex items-center w-auto max-w-[45%]">
                                        <!-- username -->
                                        <span class="username ml-1 text-md dark:text-dark-gray_300 font-normal dotted-text text-light-gray_100">@WorldAndScience</span>
                                        <!-- publish date -->
                                        <p class="mx-1 flex relative dark:text-dark-gray_300 bottom-1 font-bold text-light-gray_100">.</p>
                                        <p class="publish_date dark:text-dark-gray_300 text-light-gray_100 dotted-text">Feb 12</p>
                                    </div>
                                </div>
                                <!-- ----paragraph----- -->
                                <div class="sm:pr-4">
                                    <p class="font-normal dark:text-white text-md text-dark-gray_400">
                                        Two neutron stars colliding <br />
                                        (Credit: NASA's Goddard Space Flight Center/CI Lab)
                                    </p>
                                    <div class="w-auto max-h-[500px] flex dark:border-dark-gray_0 overflow-hidden rounded-xl border border-light-gray my-3 mr-2">
                                        <video controls autoplay muted>
                                            <source src="./../videos/The Sound of Two Neutron Stars Colliding(480p).mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <!-- ----controls icons ---- -->
                                    <div class="w-full justify-start grid sm:grid-cols-5 grid-cols-4 gap-1 mt-4">
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="sm:p-2 p-1 rounded-full fa-regular fa-comment hover:bg-main-blue_0"></i>
                                            7,964
                                        </div>
                                        <div class="tweet-control-item hover:text-main-retweet"><i class="fa-solid fa-retweet sm:p-2 p-1 rounded-full hover:bg-green-100"></i>9,247</div>
                                        <div class="tweet-control-item hover:text-main-love"><i class="fa-regular fa-heart sm:p-2 p-1 rounded-full hover:bg-pink-200"></i>90.6K</div>
                                        <div class="tweet-control-item-special hover:text-main-blue_100"><i class="fa-solid fa-chart-simple hover:bg-blue-100 sm:p-2 p-1 rounded-full"></i>30.7M</div>
                                        <div class="tweet-control-item hover:text-main-blue_100">
                                            <i class="hover:bg-blue-100 sm:p-2 p-1 rounded-full fa-solid fa-arrow-up-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;

async function fetchTweets() {
    await fetch("https://api.escuelajs.co/api/v1/products").then((response) => {
        tweetsContainer.insertAdjacentHTML("beforeend", tweetsToAdd);
        console.log("%ctweets fetched and added successfully", "color:red;");
    });
}

function observerHandler(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            loadingSpinner.classList.remove("hidden");
            console.log("%cend of tweets", "color:cyan");
            fetchTweets()
                .then((_) => {
                    observer.unobserve(lastTweet);
                    tweets = document.querySelectorAll(".tweet");
                    lastTweet = tweets[tweets.length - 1];
                    observer.observe(lastTweet);
                    loadingSpinner.classList.add("hidden");
                })
                .catch((err) => {
                    console.log("error");
                });
        } else {
            console.log("not intersecting");
        }
    });
}
let observer = new IntersectionObserver(observerHandler, {
    root: observerRoot,
    rootMargin: "0px",
    threshold: 0.7,
});

observer.observe(lastTweet);
