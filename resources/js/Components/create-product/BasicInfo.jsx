import { IconCheck, IconX } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

const BasicInfo = ({ control }) => {
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title*
            </label>
            <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="relative">
                        <input
                            {...field}
                            className="mt-1 block w-full rounded-md md:rounded-lg border border-orange-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 md:p-2.5 text-sm md:text-base"
                            placeholder="e.g. Premium Cotton T-Shirt"
                        />
                        {errors.title && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
                                <IconX size={16} className="md:w-5" />
                            </span>
                        )}
                    </div>
                )}
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug*
            </label>
            <Controller
                name="slug"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="relative">
                        <input
                            {...field}
                            className="mt-1 block w-full rounded-md md:rounded-lg border border-orange-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 md:p-2.5 bg-gray-50 text-sm md:text-base"
                            placeholder="auto-generated-slug"
                            readOnly
                        />
                        {watch("slug") && !errors.slug && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500">
                                <IconCheck size={16} className="md:w-5" />
                            </span>
                        )}
                    </div>
                )}
            />
        </div>
    </div>;

    {
        /* Description - Full width on all screens */
    }
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
        </label>
        <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
                <textarea
                    {...field}
                    rows={4}
                    className="mt-1 block w-full rounded-md md:rounded-lg border border-orange-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 md:p-2.5 text-sm md:text-base"
                    placeholder="Detailed product description..."
                />
            )}
        />
    </div>;
};

export default BasicInfo;
