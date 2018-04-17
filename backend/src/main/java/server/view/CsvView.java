package server.view;

import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class CsvView extends AbstractCsvView {
    @Override
    protected void buildCsvDocument(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        response.setHeader("Content-Disposition", "attachment; filename=\"file.csv\"");

        String documentType = (String) model.get("documentType");
        Object entitiesList = model.get(documentType);
        String[] header = new String[] {};

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);

        if (Objects.equals(documentType, "users")) {
            header = new String[] { "Id", "FirstName", "LastName", "LastName", "PhoneNumber" };
        } else if (Objects.equals(documentType, "menus")) {
            header = new String[] { "Id", "Name", "Price", "Description" };
        } else if (Objects.equals(documentType, "user_orders")) {
            header = new String[] { "Id", "Price", "DeliverTime", "AddressLine1", "AddressLine2" };
        } else if (Objects.equals(documentType, "categories")) {
            header = new String[] { "Id", "Name", "Description" };
        } else if (Objects.equals(documentType, "duration_time")) {
            header = new String[] { "Id", "DaysAmount", "DiscountCoefficient" };
        }

        csvWriter.writeHeader(header);
        List<Object> objects = (List<Object>) entitiesList;

        for(Object object : objects) {
            csvWriter.write(object, header);
        }

        csvWriter.close();
    }
}
