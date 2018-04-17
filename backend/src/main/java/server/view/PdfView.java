package server.view;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;
import server.entity.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class PdfView extends AbstractPdfView {
    @Override
    protected void buildPdfDocument(Map<String, Object> model, Document document, PdfWriter writer, HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setHeader("Content-Disposition", "attachment; filename=\"file.pdf\"");

        PdfPCell cell = new PdfPCell();
        PdfPTable table = new PdfPTable(1);
        Font font = FontFactory.getFont(FontFactory.TIMES);
        font.setColor(BaseColor.WHITE);

        String documentType = (String) model.get("documentType");

        if (documentType == "users") {
            List<User> users = (List<User>) model.get(documentType);

            document.add(new Paragraph("Generated users for " + LocalDate.now()));

            table = new PdfPTable(4);
            table.setWidthPercentage(100.0f);
            table.setSpacingBefore(10);

            cell.setBackgroundColor(BaseColor.DARK_GRAY);
            cell.setPadding(5);

            cell.setPhrase(new Phrase("ID", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("First Name", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Last Name", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Phone Number", font));
            table.addCell(cell);

            for (User user : users) {
                table.addCell(String.valueOf(user.getId()));
                table.addCell(user.getFirstName());
                table.addCell(user.getLastName());
                table.addCell(user.getPhoneNumber());
            }
        } else if (documentType == "menus") {
            List<Menu> menus = (List<Menu>) model.get(documentType);

            document.add(new Paragraph("Generated Menus for " + LocalDate.now()));

            table = new PdfPTable(4);
            table.setWidthPercentage(100.0f);
            table.setSpacingBefore(10);

            cell.setBackgroundColor(BaseColor.DARK_GRAY);
            cell.setPadding(5);

            cell.setPhrase(new Phrase("ID", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Name", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Price", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Description", font));
            table.addCell(cell);

            for (Menu menu : menus) {
                table.addCell(String.valueOf(menu.getId()));
                table.addCell(menu.getName());
                table.addCell(String.valueOf(menu.getPrice()));
                table.addCell(menu.getDescription());
            }
        } else if (documentType == "user_orders") {
            List<UserOrder> userOrders = (List<UserOrder>) model.get(documentType);

            document.add(new Paragraph("Generated User Orders for " + LocalDate.now()));

            table = new PdfPTable(5);
            table.setWidthPercentage(100.0f);
            table.setSpacingBefore(10);

            cell.setBackgroundColor(BaseColor.DARK_GRAY);
            cell.setPadding(5);

            cell.setPhrase(new Phrase("ID", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Price", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Deliver Time", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Address Line 1", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Address Line 2", font));
            table.addCell(cell);

            for (UserOrder userOrder : userOrders) {
                table.addCell(String.valueOf(userOrder.getId()));
                table.addCell(String.valueOf(userOrder.getPrice()));
                table.addCell(String.valueOf(userOrder.getDeliverTime()));
                table.addCell(userOrder.getAddressLine1());
                table.addCell(userOrder.getAddressLine2());
            }
        } else if (documentType == "categories") {
            List<Category> categories = (List<Category>) model.get(documentType);

            document.add(new Paragraph("Generated Categories for " + LocalDate.now()));

            table = new PdfPTable(3);
            table.setWidthPercentage(100.0f);
            table.setSpacingBefore(10);

            cell.setBackgroundColor(BaseColor.DARK_GRAY);
            cell.setPadding(5);

            cell.setPhrase(new Phrase("ID", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Name", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Description", font));
            table.addCell(cell);

            for (Category category : categories) {
                table.addCell(String.valueOf(category.getId()));
                table.addCell(category.getName());
                table.addCell(category.getDescription());
            }
        } else if (documentType == "duration_time") {
            List<DurationTime> durationTimes = (List<DurationTime>) model.get(documentType);

            document.add(new Paragraph("Generated Duration Times for " + LocalDate.now()));

            table = new PdfPTable(3);
            table.setWidthPercentage(100.0f);
            table.setSpacingBefore(10);

            cell.setBackgroundColor(BaseColor.DARK_GRAY);
            cell.setPadding(5);

            cell.setPhrase(new Phrase("ID", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Days Amount", font));
            table.addCell(cell);

            cell.setPhrase(new Phrase("Discount Coefficient", font));
            table.addCell(cell);

            for (DurationTime durationTime : durationTimes) {
                table.addCell(String.valueOf(durationTime.getId()));
                table.addCell(String.valueOf(durationTime.getDaysAmount()));
                table.addCell(String.valueOf(durationTime.getDiscountCoefficient()));
            }
        }

        document.add(table);
    }
}