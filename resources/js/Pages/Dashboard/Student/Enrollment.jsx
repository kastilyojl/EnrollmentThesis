import Layout from "@/components/layout";
import React from "react";

export default function Enrollment() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Enrollment</h1>
            </div>
            <div className="space-y-4">
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div class="mx-auto max-w-screen-sm text-center">
                            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                                503
                            </h1>
                            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                Enrollment is not open at the moment
                            </p>
                            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                Please wait until the evaluation is complete
                                before you can access this section
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
