import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.json.JSONObject;
import org.json.JSONException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AscensionDataScraper {
    public static void main(String[] args) {
        // Set up WebDriver (Chrome in this example)
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver"); // Update with your chromedriver path
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Run in headless mode
        WebDriver driver = new ChromeDriver(options);

        try {
            // Load the target page
            String url = "https://honkai-star-rail.fandom.com/wiki/Acheron/Combat"; // Example URL
            driver.get(url);

            // Wait for page to load (add explicit wait if needed)
            Thread.sleep(2000); // Simple delay, replace with WebDriverWait for robustness

            // Get page source and parse with Jsoup
            String pageSource = driver.getPageSource();
            Document doc = Jsoup.parse(pageSource);

            // Load JSON selectors
            String jsonContent = loadJsonFile("ascensionSelectors.json"); // Ensure this file is in your project directory
            JSONObject jsonObject = new JSONObject(jsonContent);
            JSONObject ascensionData = jsonObject.getJSONObject("ascension_data");

            // Extract table
            Element table = doc.select(ascensionData.getString("table_selector")).first();
            if (table == null) {
                System.out.println("Table not found!");
                return;
            }

            // Extract rows
            Elements rows = table.select(ascensionData.getString("rows_selector"));
            List<JSONObject> ascensionList = new ArrayList<>();

            for (Element row : rows) {
                JSONObject ascensionEntry = new JSONObject();
                try {
                    // Extract level
                    Element levelElement = row.select(ascensionData.getJSONObject("columns").getString("level")).first();
                    if (levelElement != null) {
                        ascensionEntry.put("level", levelElement.text());
                    }

                    // Extract materials
                    JSONObject materials = new JSONObject();
                    JSONObject columns = ascensionData.getJSONObject("columns").getJSONObject("materials");
                    Element materialsCell = row.select("td:nth-child(2)").first();

                    if (materialsCell != null) {
                        // Credit
                        Element creditElement = materialsCell.select(columns.getString("credit")).first();
                        if (creditElement != null) {
                            materials.put("credit", creditElement.text());
                        }

                        // Item 1
                        Element item1Element = materialsCell.select(columns.getString("item1")).first();
                        Element item1QtyElement = materialsCell.select(columns.getString("item1_quantity")).first();
                        if (item1Element != null && item1QtyElement != null) {
                            materials.put("item1", item1Element.attr("alt"));
                            materials.put("item1_quantity", item1QtyElement.text());
                        }

                        // Item 2
                        Element item2Element = materialsCell.select(columns.getString("item2")).first();
                        Element item2QtyElement = materialsCell.select(columns.getString("item2_quantity")).first();
                        if (item2Element != null && item2QtyElement != null) {
                            materials.put("item2", item2Element.attr("alt"));
                            materials.put("item2_quantity", item2QtyElement.text());
                        }

                        // Item 3
                        Element item3Element = materialsCell.select(columns.getString("item3")).first();
                        Element item3QtyElement = materialsCell.select(columns.getString("item3_quantity")).first();
                        if (item3Element != null && item3QtyElement != null) {
                            materials.put("item3", item3Element.attr("alt"));
                            materials.put("item3_quantity", item3QtyElement.text());
                        }
                    }

                    ascensionEntry.put("materials", materials);
                    ascensionList.add(ascensionEntry);
                } catch (JSONException e) {
                    System.err.println("Error parsing row: " + e.getMessage());
                }
            }

            // Print results
            System.out.println("Ascension Data:");
            for (JSONObject entry : ascensionList) {
                System.out.println(entry.toString(2)); // Pretty print with indentation
            }

        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        } finally {
            // Clean up
            driver.quit();
        }
    }

    private static String loadJsonFile(String fileName) throws IOException {
        // Load JSON file (assuming it's in the project root for simplicity)
        File file = new File(fileName);
        return new String(java.nio.file.Files.readAllBytes(file.toPath()));
    }
}