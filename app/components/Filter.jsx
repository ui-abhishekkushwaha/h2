
export const Filter = ({ filters, getFilters }) => {

    const hanldeCheckBoxClick = (e) => {
        getFilters(e.target.checked, e.target.value);
    }

    return (
        <>
            <form class="mt-4 border-t border-gray-200">
                <div class="border-t border-gray-200 px-4 py-6">
                    {filters.products.filters.map((item, index) => (
                        <>
                            <button
                                key={index}
                                type="button"
                                className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-2"
                                aria-expanded="false"
                            >
                                <span className="font-medium text-gray-900">{item.label}</span>
                                <span className="ml-6 flex items-center">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </button>

                            <div class="pt-6" id="filter-section-mobile-2">
                                <div class="space-y-6">
                                    {item.values.map(value => (
                                        <div class="flex items-center">
                                            <input onClick={hanldeCheckBoxClick} key={value.id} id="filter-mobile-size-0" name={item.id} value={value.input} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                            <label for="filter-mobile-size-0" class="ml-3 min-w-0 flex-1 text-gray-500">{value.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </form>
        </>
    )

}